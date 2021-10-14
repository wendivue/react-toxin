import clsx from 'clsx';
import moment, { Moment } from 'moment';
import 'moment/locale/ru';
import React, { useRef, useState, useEffect } from 'react';
import {
  DayPickerRangeController,
  FocusedInputShape,
  isInclusivelyAfterDay,
} from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { useTranslation } from 'next-i18next';

import { START_DATE } from './constants';
import { DropdownDateButton } from './DropdownDateButton/DropdownDateButton';
import { DropdownDateInput } from './DropdownDateInput';
import { DropdownDateNavigation } from './DropdownDateNavigation';
import { DatesChangeValues, DropdownDateProps } from './types';

moment.updateLocale('ru', {
  months: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ],
  weekdaysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
  monthsShort: [
    'янв',
    'фев',
    'мар',
    'апр',
    'май',
    'июн',
    'июл',
    'авг',
    'сен',
    'окт',
    'ноя',
    'дек',
  ],
});

const DropdownDate = (props: DropdownDateProps): JSX.Element => {
  const { t, i18n } = useTranslation(['filter', 'common']);
  const translatedStartLabelText = t('arrival');
  const translatedEndLabelText = t('departure');
  moment.locale(i18n.language);

  const {
    startValue,
    endValue,
    setFrom,
    setTo,
    onClear,
    isSingleInput = false,
    isInlineCalendar = false,
    startLabelText = translatedStartLabelText,
    endLabelText = translatedEndLabelText,
  } = props;

  const initialStartValue = startValue === null ? null : moment(startValue);
  const initialEndValue = endValue === null ? null : moment(endValue);
  const [momentStartValue, setMomentStartValue] = useState<Moment | null>(
    initialStartValue,
  );
  const [momentEndValue, setMomentEndValue] = useState<Moment | null>(
    initialEndValue,
  );
  const [focusedElem, setFocusedElem] = useState<FocusedInputShape>(START_DATE);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const inputRef = useRef<HTMLDivElement>(null);

  const isCalendarValuesMustBlank = (): boolean => {
    return (
      startValue === null &&
      endValue === null &&
      momentStartValue !== null &&
      momentEndValue !== null
    );
  };

  if (isCalendarValuesMustBlank()) {
    setMomentStartValue(null);
    setMomentEndValue(null);
  }

  const onDatesChange = ({ startDate, endDate }: DatesChangeValues): void => {
    if (momentStartValue !== startDate) {
      setMomentStartValue(startDate);
      startDate ? setFrom(startDate?.toDate()) : setFrom(null);
    }
    if (momentEndValue !== endDate) {
      setMomentEndValue(endDate);
      endDate ? setTo(endDate?.toDate()) : setTo(null);
    }
  };

  const onFocusChange = (focusedInput: FocusedInputShape | null): void => {
    setFocusedElem(!focusedInput ? START_DATE : focusedInput);
  };

  const showCalendar = (): void => {
    setShowDatePicker(() => true);
  };

  const clearDateSelection = (): void => {
    setMomentStartValue(null);
    setMomentEndValue(null);
    setFrom(null);
    setTo(null);
    onClear();
  };

  const setDateSelection = (e: React.MouseEvent<HTMLElement>): void => {
    const target = e.target as Element;
    const isContainsTarget =
      inputRef.current && inputRef.current?.contains(target);
    if (!isContainsTarget) setShowDatePicker(() => false);
  };

  let startDateString =
    momentStartValue === null ? '' : momentStartValue.format('DD.MM.YYYY');
  let endDateString =
    momentEndValue === null ? '' : momentEndValue.format('DD.MM.YYYY');
  let dateRangeString = '';

  if (isSingleInput) {
    startDateString =
      momentStartValue === null ? '' : momentStartValue.format('DD MMM');
    endDateString =
      momentEndValue === null ? '' : momentEndValue.format('DD MMM');
    dateRangeString =
      momentStartValue && endValue
        ? `${startDateString} - ${endDateString}`
        : `${t('common:dateStructureShort')} - ${t(
            'common:dateStructureShort',
          )}`;
  }

  const calendarSettings = {
    startDate: momentStartValue,
    endDate: momentEndValue,
    onDatesChange,
    onFocusChange,
    focusedInput: focusedElem,
    enableOutsideDays: true,
    hideKeyboardShortcutsPanel: true,
    noBorder: true,
    daySize: isSingleInput ? 32 : 40,
    navPrev: <DropdownDateNavigation isForwardArrow={false} />,
    navNext: <DropdownDateNavigation isForwardArrow />,
    renderCalendarInfo: () => (
      <DropdownDateButton
        onClearDate={clearDateSelection}
        onSetDate={setDateSelection}
      />
    ),
  };

  useEffect(() => {
    if (startValue?.toString() !== momentStartValue?.toDate().toString()) {
      startValue === null
        ? setMomentStartValue(null)
        : setMomentStartValue(moment(startValue));
    }
    if (endValue?.toString() !== momentEndValue?.toDate().toString()) {
      endValue === null
        ? setMomentEndValue(null)
        : setMomentEndValue(moment(endValue));
    }
  }, [startValue, momentStartValue, endValue, momentEndValue]);

  return (
    <div className={clsx('dropdownDate', isSingleInput && 'filter')}>
      {isInlineCalendar ? (
        <DayPickerRangeController
          {...calendarSettings}
          initialVisibleMonth={() => moment().set({ year: 2019, month: 7 })}
        />
      ) : (
        <>
          <DropdownDateInput
            ref={inputRef}
            onInputClick={showCalendar}
            isSingleInput={isSingleInput}
            startLabelText={startLabelText}
            endLabelText={endLabelText}
            dateRangeString={dateRangeString}
            startDateString={startDateString}
            endDateString={endDateString}
          />
          {showDatePicker && (
            <DayPickerRangeController
              {...calendarSettings}
              initialVisibleMonth={null}
              onOutsideClick={setDateSelection}
              isOutsideRange={(day) => !isInclusivelyAfterDay(day, moment())}
              transitionDuration={0}
            />
          )}
        </>
      )}
    </div>
  );
};

export { DropdownDate };
