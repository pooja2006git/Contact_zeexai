from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import JobApplicationSerializer


@api_view(['POST'])
def create_application(request):
    """
    Create a new job application.
    POST /api/applications/
    """
    serializer = JobApplicationSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        return Response(
            {
                'success': True,
                'message': 'Application submitted successfully.',
                'data': serializer.data
            },
            status=status.HTTP_201_CREATED
        )
    
    return Response(
        {
            'success': False,
            'message': 'Validation failed.',
            'errors': serializer.errors
        },
        status=status.HTTP_400_BAD_REQUEST
    )
