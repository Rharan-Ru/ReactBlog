from users.models import IpAddress


# This fuction get visitor ip address to count articles views
def get_ip_address(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[-1].strip()
    else:
        ip = request.META.get('REMOTE_ADDR')
    ip = IpAddress.objects.get(ip_address=ip)
    return ip
