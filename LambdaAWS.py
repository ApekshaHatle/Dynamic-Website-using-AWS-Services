import json
import boto3
import uuid
from boto3.dynamodb.conditions import Key
from decimal import Decimal

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Recipe-Details')

def lambda_handler(event, context):
    print('event:', json.dumps(event))
    
    if 'action' in event:
        action = event['action']
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
    else:
        return search_recipe(event)

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

def search_recipe(event):
    try:
        dish_name = event['dish_name']
        
        # Perform the query operation
        response = table.scan(
            FilterExpression=Key('NameOfDish').begins_with(dish_name)
        )
        
        # Extract items from the response
        recipes = response['Items']
        
        # Convert Decimal objects to float for JSON serialization
        for recipe in recipes:
            for key, value in recipe.items():
                if isinstance(value, Decimal):
                    recipe[key] = float(value)
        
        return {
            'statusCode': 200,
            'body': json.dumps(recipes)
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
