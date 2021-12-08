import datetime
from users.models import IpAddress


class SaveIpAddressMiddleware(object):
    """
        Save the Ip address if does not exist
    """
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[-1].strip()
        else:
            ip = request.META.get('REMOTE_ADDR')
        try:
            IpAddress.objects.get(ip_address=ip)
            return self.get_response(request)
        except Exception:             #-----Here My Edit
              ip_address = IpAddress(ip_address=ip)
              ip_address.save()
              return self.get_response(request)
        return self.get_response(request)
