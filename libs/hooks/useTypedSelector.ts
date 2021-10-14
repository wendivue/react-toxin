import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { RootState } from '../../store/rootReducer';

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useTypedSelector };
