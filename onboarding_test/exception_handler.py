from .exceptions import NotFoundException, ForbiddenException
from .standard_response import CustomResponse
from rest_framework import status

def custom_exception_handler(exc, context):
    if isinstance(exc, NotFoundException):
        return CustomResponse(exc.detail, status=exc.status_code)
    if isinstance(exc, ForbiddenException):
        return CustomResponse(exc.detail, status=exc.status_code)
    # return None
    return CustomResponse("Something went wrong.", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
