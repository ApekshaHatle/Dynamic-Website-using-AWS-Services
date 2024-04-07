# import the JSON utility,AWS SDK (for Python the package name is boto3)
import json
import math
import boto3
import uuid
# import uuid4

dynamodb = boto3.resource('dynamodb')    # create a DynamoDB object using the AWS SDK

table = dynamodb.Table('OUR-TABLE-NAME')   # use the DynamoDB object to select our table


# define the handler function that the Lambda service will use an entry point
def lambda_handler(event, context):

# extract the data from the Lambda service's event object
    NameOfDish = event['NameOfDish']
    ID = uuid.uuid4().hex

# write dish details to the DynamoDB table using the object we instantiated and save response in a variable
    response = table.put_item(
        Item={
            'ID': ID,
            'NameOfDish': NameOfDish
            })

# return a properly formatted JSON object
    return {
    'statusCode': 200,
    'body': json.dumps('Item inserted ' + NameOfDish )
    }