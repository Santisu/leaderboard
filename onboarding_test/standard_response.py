from datetime import datetime
from rest_framework.response import Response

class StandardResponse():
    status: int
    data: any
    timestamp = datetime.now()
    
    def __init__(self, data, status, timestamp=timestamp):
        self.data = data
        self.status = status
        self.timestamp = timestamp
        
class CustomResponse(Response):
    def __init__(self, data, status):
        data = StandardResponse(data=data, status=status)
        super().__init__(data.__dict__, status=status)
