import 'babel-polyfill';

window.Utility = window.Utility || {};

Utility.StripeSource = () => {
  if ($('#stripe-source').length) {
    const stripe = Stripe($("meta[name='stripe-key']").attr('content'));
    const lang = $('html').attr('lang').substring(0, 2);
    const elements = stripe.elements({locale: lang});

    // Custom styling can be passed to options when creating an Element.
    // const style = {
    //   base: {
    //     // Add your base input styles here. For example:
    //     fontSize: '16px',
    //     lineHeight: '24px',
    //   },
    // };

    // Create an instance of the card Element
    // const card = elements.create('card', {style});
    const card = elements.create('card');

    // Add an instance of the card Element into the 'stripe-source' div
    card.mount('#stripe-source');

    card.addEventListener('change', ({error}) => {
      const displayError = document.getElementById('card-errors');
      if (error) {
        displayError.textContent = error.message;
        displayError.style.display = 'block';
      } else {
        displayError.textContent = '';
        displayError.style.display = 'none';
      }
    });

    // Create a token or display an error the form is submitted.
    const form = document.getElementById('stripe-source-form');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      // stripe.createSource(card).then((result) => {
      //   debugger
      // // handle result.error or result.source
      // });
      const { source, error } = await stripe.createSource(card, {
        owner: {
          name: form.querySelector('input[name=cardholder-name]').value,
        }
      });
      // const {token, error} = await stripe.createToken(card);
      if (error) {
        // Inform the user if there was an error
        const errorElement = document.getElementById('card-errors');
        errorElement.textContent = error.message;
        errorElement.style.display = 'block';
        setTimeout(function() {
          $(event.target).find('input[type=submit]').removeAttr('disabled');
        }, 500);
      } else {
        // Send the token to your server
        stripeSourceHandler(source);
      }
    });

    const stripeSourceHandler = (source) => {
      const card = source.card;
      const owner = source.owner;
      // Insert the token ID into the form so it gets submitted to the server
      const $form = $('#stripe-source-form');

      $form.append($('<input type="hidden" name="stripe_card[stripe_id]" />').val(source.id));

      // Submit the form
      $form.submit();
    }
  }
}

$(document).on('turbolinks:load', () => {
  Utility.StripeSource();
});
