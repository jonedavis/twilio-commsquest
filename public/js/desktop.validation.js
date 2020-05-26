/**
 * Check for valid phone numbers in north america and international (no shortcode check)
 * @param {number} number phone number
 * @return {boolean} isValid phone number
 */
function isValidPhoneNumber(number) {
  const regex = /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,3})|(\(?\d{2,3}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/;
  const isValid = number.match(regex) ? true : false;
  return isValid;
}

(function() {
  $(function() {
    const $numberField = $('#txtPhoneNumber');
    const $btnStart = $('#btnStart');

    let validNumber = false;
    // const validBorderKeyFrame = 'valid-border-pulse 1s infinite';
    const validTextKeyFrame = 'valid-text-pulse 1s infinite';
    const invalidBorderKeyFrame = 'invalid-border-pulse 1s infinite';

    // Define keyframe animations
    $.keyframe.define([
      {
        name: 'invalid-border-pulse',
        '0%': {
          'border-color': 'black',
        },
        '100%': {
          'border-color': 'rgb(58, 85, 162)',
        },
      },
      {
        name: 'valid-border-pulse',
        '0%': {
          'border-color': 'black',
        },
        '100%': {
          'border-color': 'rgb(115, 204, 220)',
        },
      },
      {
        name: 'valid-text-pulse',
        '0%': {
          color: 'black',
        },
        '100%': {
          color: 'white',
        },
      },
    ]);

    // make sure default pulse is on phone number field
    $numberField.playKeyframe(invalidBorderKeyFrame);

    $numberField.on('keyup', function() {
      const number = $numberField.val();
      const isValid = isValidPhoneNumber(number);

      if (isValid) {
        validNumber = true;
        $numberField.resetKeyframe();
        $numberField.css('border-color', 'rgb(115, 204, 220)');
        $btnStart.playKeyframe(validTextKeyFrame);
        $btnStart.text('CLICK HERE TO START');
      } else if (!isValid && validNumber) {
        validNumber = false;
        $numberField.playKeyframe(invalidBorderKeyFrame);
        $btnStart.resetKeyframe();
        $btnStart.text('SYNC PLAYER 1');
      }
    });
  });
})();
