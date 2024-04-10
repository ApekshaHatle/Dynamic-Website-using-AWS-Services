import json
import boto3
import uuid

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('PUT-TABLE-NAME-HERE')

def lambda_handler(event, context):
    action = event['action']  # Retrieve the action parameter from the event
    if action == 'insert':
        return insert_recipe(event)
    elif action == 'update':
        return update_recipe(event)
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
        table.update_item(
            Key={'ID': event['ID']},
            UpdateExpression='SET NameOfDish = :n, PrepTime = :p, Serves = :s, Difficulty = :d, Cuisine = :c, Tags = :t, AddedBy = :a, Ingredients = :i, Image = :img',
            ExpressionAttributeValues={
                ':n': recipe_data['NameOfDish'],
                ':p': recipe_data['PrepTime'],
                ':s': recipe_data['Serves'],
                ':d': recipe_data['Difficulty'],
                ':c': recipe_data['Cuisine'],
                ':t': recipe_data['Tags'],
                ':a': recipe_data['AddedBy'],
                ':i': recipe_data['Ingredients'],
                ':img': recipe_data['Image']
            }
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
