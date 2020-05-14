import { useState, useEffect, useCallback } from 'react';
import { useFormikContext } from 'formik';
import _ from 'lodash';

const AutoSave = ({ debounceMs = 1000 }) => {
  const formik = useFormikContext();
  const [isSaved, setIsSaved] = useState(null);
  const debouncedSubmit = useCallback(
    _.debounce(() => {
      return formik.submitForm().then(() => setIsSaved(true));
    }, debounceMs),
    [formik.submitForm, debounceMs],
  );

  useEffect(() => debouncedSubmit, [debouncedSubmit, formik.values]);

  return null
};

export default AutoSave;
