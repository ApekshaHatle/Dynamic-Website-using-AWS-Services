import json
import boto3
import uuid

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Recipe-Details')

def lambda_handler(event, context):
    action = event['action']  # Retrieve the action parameter from the event
    if action == 'insert':
        return insert_recipe(event)
    elif action == 'update':
        return update_recipe(event)
    elif action == 'delete':
        return delete_recipe(event)
    else:
        return {
            'statusCode': 400,
            'body': json.dumps('Invalid action')
        }

def insert_recipe(event):
    try:
        recipe_data = extract_recipe_data(event)
        table.put_item(Item=recipe_data)
        return {
            'statusCode': 200,
            'body': json.dumps('Recipe inserted successfully')
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(str(e))
        }

def update_recipe(event):
    try:
        recipe_data = extract_recipe_data(event)
        update_expression = 'SET '
        expression_attribute_values = {}
        
        for key, value in recipe_data.items():
            # Skip the ID attribute as it should not be updated
            if key == 'ID' or value == "":
                continue
            
            # Construct the update expression dynamically
            update_expression += f"{key} = :{key}, "
            expression_attribute_values[f":{key}"] = value
        
        # Remove the trailing comma and space from the update expression
        update_expression = update_expression[:-2]
        
        # Perform the update operation
        table.update_item(
            Key={'ID': event['ID']},
            UpdateExpression=update_expression,
            ExpressionAttributeValues=expression_attribute_values
        )
        
        return {
            'statusCode': 200,
            'body': json.dumps('Recipe updated successfully')
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(str(e))
        }

def delete_recipe(event):
    try:
        recipe_id = event['ID']
        table.delete_item(
            Key={'ID': recipe_id}
        )
        return {
            'statusCode': 200,
            'body': json.dumps('Recipe deleted successfully')
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(str(e))
        }

def extract_recipe_data(event):
    return {
        'ID': str(uuid.uuid4()),  # Generate a new ID for insert operation
        'NameOfDish': event['NameOfDish'],
        'PrepTime': event['PrepTime'],
        'Serves': event['Serves'],
        'Difficulty': event['Difficulty'],
        'Cuisine': event['Cuisine'],
        'Tags': event['Tags'],
        'AddedBy': event['AddedBy'],
        'Ingredients': event['Ingredients'],
        'Image': event['Image']
    }

"""
TEST LAMBDA : 
{
  "action": "update",
  "ID": "f93e55d4337f4a9ca3a75b3452380d69",
  "NameOfDish": "Spaghetti Carbonara",
  "PrepTime": "",
  "Serves": 4,
  "Difficulty": "",
  "Cuisine": "",
  "Tags": "",
  "AddedBy": "plschange",
  "Ingredients": "",
  "Image": "https://example.com/spaghetti_carbonara.jpg"
}

"""