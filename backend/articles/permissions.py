from rest_framework.permissions import SAFE_METHODS, BasePermission


# Permission that verify if request user is article author or not
class PostUserWritePermission(BasePermission):
    message = 'Editing posts is restricted to the author only.'
    
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return True
        return False

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.author == request.user
