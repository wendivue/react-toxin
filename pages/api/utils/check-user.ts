import { NextApiRequest, NextApiResponse } from 'next';
import { FirebaseAdmin } from '@/libs/FirebaseAdmin';
import { UserInfo } from 'store/auth/authTypes';
import { Booking } from 'store/booking/bookingTypes';

const firebaseAdmin = new FirebaseAdmin();
const validate = async (
  token: string,
): Promise<{ user: UserInfo | null; uid: string; booking: Booking | null }> => {
  try {
    const decodedToken = await firebaseAdmin.auth.verifyIdToken(token);

    const { uid } = decodedToken;
    const user = await firebaseAdmin.getUser(uid);
    const booking = await firebaseAdmin.getBooking(uid);
    return {
      user,
      uid,
      booking,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return { user: null, booking: null } as never;
  }
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const { token } = JSON.parse(req.headers.authorization || '{}') as {
    token: string | undefined;
  };

  if (token === undefined) {
    return res.status(403).send({
      errorCode: 403,
      message: 'Auth token missing.',
    });
  }

  const result = await validate(token);

  return res.status(200).send(result);
};
