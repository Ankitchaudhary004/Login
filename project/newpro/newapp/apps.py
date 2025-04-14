from django.apps import AppConfig


class NewappConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'newapp'

    def ready(self):
        from allauth.socialaccount.models import SocialAccount

        def socialaccount_str(self):
            return f"{self.user} ({self.provider})"

        SocialAccount.__str__ = socialaccount_str