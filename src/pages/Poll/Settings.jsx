import React from 'react';
import { Field } from 'formik';
import styled from "styled-components";

import Checkbox from 'components/Checkbox';
import Select from 'components/Select';
import DeletePoll from 'modals/DeletePoll';

import ErrorIcon from 'assets/ErrorIcon.svg';

import { withModal } from 'providers/ModalProvider';


const Header = styled.h5`
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.neutral[700]};
  margin-bottom: 8px;
`;
const Label = styled.label`
  display: block;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 0.7px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.neutral[500]};
  margin-top: 16px;
  margin-bottom: 6px;
  
  &:first-of-type {
    margin-top: 8px;
  }
`;
const AlignWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const Info = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.neutral[700]};
`;
const DeletePollButton = styled.button`
  font-size: 16px;
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.neutral[700]};
  
  &:hover {
    color: ${({ theme }) => theme.colors.danger};
    text-decoration: underline;
    cursor: pointer;
  }
`;
const Icon = styled.img`
  height: 18px;
  margin-right: 8px;
  margin-bottom: 4px;
`;


function Settings(props) {
  const { modal } = props;

  const resultsAccess = [
    { value: 'me', label: 'Tylko ja' },
    { value: 'everyone', label: 'Wszyscy' },
  ];

  const now = new Date();
  const minuteInMilliseconds = 60000;

  const nowPlusHalfHour = new Date(now.getTime() + 30 * minuteInMilliseconds);
  const nowPlusOneHour = new Date(now.getTime() + 60 * minuteInMilliseconds);
  const atMidnight = new Date(new Date().setHours(24, 0, 0, 0));

  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const dayAfterTomorrow = new Date(now);
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

  const lastDayOfWeek = now.getDate() - (now.getDay() - 1) + 6;
  const endOfWeek = new Date(now.setDate(lastDayOfWeek));

  const oneWeek = new Date(now);
  oneWeek.setDate(new Date().getDate() + 7);

  const expire = [
    { value: nowPlusHalfHour, label: 'za pół godziny' },
    { value: nowPlusOneHour, label: 'za godzinę' },
    { value: atMidnight, label: 'o północy' },
    { value: tomorrow, label: 'jutro' },
    { value: dayAfterTomorrow, label: 'pojutrze' },
    { value: endOfWeek, label: 'do końca tygodnia' },
    { value: oneWeek, label: 'za tydzień' },
  ];

  return (
    <div>
      <Header>opcje</Header>
      <Label>anonimowość</Label>
      <AlignWrapper>
        <Field name="settings.requireSignature">
          {({ field }) => <Checkbox field={field}/>}
        </Field>
        <Info>Wymagaj podpisu</Info>
      </AlignWrapper>
      <Label>wgląd w odpowiedzi</Label>
      <Field
        name="settings.resultsAccess"
        component={Select}
        options={resultsAccess}
      />
      <Label>ankieta wygaśnie</Label>
      <Field
        name="settings.expire"
        component={Select}
        options={expire}
      />
      <Label>strefa zagrożenia</Label>
      <AlignWrapper>
        <Icon src={ErrorIcon} alt="Error icon"/>
        <DeletePollButton
          type="button"
          onClick={() => modal.open(<DeletePoll/>)}
        >
          Usuń ankietę
        </DeletePollButton>
      </AlignWrapper>
    </div>
  );
};

export default withModal(Settings);
