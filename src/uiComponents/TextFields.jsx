// @flow
import React from 'react';
import NumberFormat from 'react-number-format';

type PhoneNumberFormatterType = {
  onChange: Function,
  inputRef: Function,
}
const PhoneNumberFormatter = (props: PhoneNumberFormatterType) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      format="(###) ###-####"
      isNumericString
    />
  );
};

export default PhoneNumberFormatter;
