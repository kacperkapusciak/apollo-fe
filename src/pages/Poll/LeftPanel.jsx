import React, { useEffect, useState } from 'react';
import { Field } from 'formik';
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion"

import axios from 'axios-instance';

import Label from 'components/Label';
import Checkbox from 'components/Checkbox';
import Select from 'components/Select';
import DeletePoll from 'modals/DeletePoll';

import ErrorIcon from 'assets/ErrorIcon.svg';
import UserPINIcon from 'assets/UserPINIcon.svg';
import AdminPINIcon from 'assets/AdminPINIcon.svg';

import { withModal } from 'providers/ModalProvider';


const Header = styled.h5`
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.neutral[700]};
  margin-bottom: 8px;
  margin-top: ${({ margin }) => margin ? '16px' : '0'};
`;
const LabelStyled = styled(Label)`
  margin-top: ${({ margin }) => margin ? '16px' : '8px'};
  margin-bottom: ${({ margin }) => margin ? '6px' : 0};
`;
const AlignWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.neutral[700]};
`;
const Input = styled(Field)`
  height: 40px;
  font-size: 16px;
  border: 2px solid ${({ theme }) => theme.colors.neutral[200]};
  border-radius: 8px;
  padding: 8px;
  max-width: 200px;
  color: ${({ theme }) => theme.colors.neutral[600]};
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral[400]};
  }
`;
const variants = {
  visible: { opacity: 1, transition: { duration: 0.5 } },
  hidden: { opacity: 0 },
};
const InputWrapper = styled(motion.div).attrs(() => ({
  initial: "hidden",
  exit: { opacity: 0, transition: { duration: 0.5 } },
  variants
}))`
  margin-top: 8px;
`;
const DeletePollButton = styled.button`
  font-size: 14px;
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
const PINComponent = styled.div`
  display: flex;
  align-items: center;
  font-size: 24px;
  letter-spacing: -0.7px;
  
  & > img {
    height: 15px;
    margin-right: 6px;
  }
`;


function LeftPanel(props) {
  const { modal, sendSummary } = props;
  const [PIN, setPIN] = useState({ user: null, creator: null });

  useEffect(() => {
    async function getPIN() {
      const { data } = await axios.get('init');
      if (data) {
        const { pinUser, pinCreator } = data;
        setPIN({ user: pinUser, creator: pinCreator });
      }
    }

    getPIN();
  }, []);

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
      <section>
        <Header>bezpieczeństwo</Header>
        <LabelStyled>pin administratora</LabelStyled>
        <PINComponent>
          <img src={AdminPINIcon} alt=''/>
          {PIN.creator}
        </PINComponent>
        <LabelStyled>pin odpowiadającego</LabelStyled>
        <PINComponent>
          <img src={UserPINIcon} alt=''/>
          {PIN.user}
        </PINComponent>
      </section>
      <section>
        <Header margin>opcje</Header>
        <LabelStyled margin>anonimowość</LabelStyled>
        <AlignWrapper>
          <Field name="settings.requireSignature">
            {({ field }) => <Checkbox field={field}/>}
          </Field>
          <Info>Wymagaj podpisu</Info>
        </AlignWrapper>
        <LabelStyled margin>wgląd w odpowiedzi</LabelStyled>
        <Field
          name="settings.resultsAccess"
          component={Select}
          options={resultsAccess}
        />
        <LabelStyled margin>ankieta wygaśnie</LabelStyled>
        <Field
          name="settings.expire"
          component={Select}
          options={expire}
        />
        <LabelStyled margin>e-mail</LabelStyled>
        <AlignWrapper>
          <Field name="settings.sendSummary">
            {({ field }) => <Checkbox field={field}/>}
          </Field>
          <Info>Prześlij podsumowanie ankiety na mój adres e-mail</Info>
        </AlignWrapper>
        <AnimatePresence>
          {sendSummary && (
            <InputWrapper animate='visible'>
              <Input type="email" name="settings.email" placeholder="jankowalski@apollo.com"/>
            </InputWrapper>
          )}
        </AnimatePresence>
        <LabelStyled margin>strefa zagrożenia</LabelStyled>
        <AlignWrapper>
          <Icon src={ErrorIcon} alt="Error icon"/>
          <DeletePollButton
            type="button"
            onClick={() => modal.open(<DeletePoll/>)}
          >
            Usuń ankietę
          </DeletePollButton>
        </AlignWrapper>
      </section>
    </div>
  );
}

export default withModal(LeftPanel);
