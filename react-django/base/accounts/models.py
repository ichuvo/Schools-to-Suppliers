from django.db import models
from django.core.mail import EmailMultiAlternatives
from django.dispatch import receiver
from django.template.loader import render_to_string
from django.urls import reverse

from django_rest_passwordreset.signals import reset_password_token_created


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    """
    Handles password reset tokens
    When a token is created, an e-mail needs to be sent to the user
    :param sender: View Class that sent the signal
    :param instance: View Instance that sent the signal
    :param reset_password_token: Token Model Object
    :param args:
    :param kwargs:
    :return:
    """
    # send an e-mail to the user
    message = "Hello {institute},\n\n".format(
        institute=reset_password_token.user.institute)
    message += "Your account with Agile Link has been successfully created. To set your new password, please visit this link:\n"
    message += "http://localhost:8000/password_reset/confirm?token={token} \n\n".format(
        token=reset_password_token.key)
    message += "Thanks,\n"
    message += "The Agile Link Team"
    msg = EmailMultiAlternatives(
        # title:
        "Password Reset for {title}".format(title="Agile Link"),
        # message:
        message,
        # from:
        "admin@agilelink.com.au",
        # to:
        [reset_password_token.user.email]
    )

    msg.send()
