#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from crypt import methods
from flask import request, session, make_response,jsonify
from flask_cors import cross_origin
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import Pet, Review, Service



class Pets(Resource):
    def get(self):
        pets = [pet.to_dict() for pet in Pet.query.all()]
        return make_response(pets, 200)
    
    def post(self):
        json = request.get_json()

        new_pet = Pet(
            name = json['name'],
            age = json['age'],
            species = json['species'],
            image_url = json['image_url']
        )
        db.session.add(new_pet)
        db.session.commit()
        pet_dict = new_pet.to_dict()
        response = make_response(
            jsonify(pet_dict, 201)
        )
        return response
    
api.add_resource(Pets, '/pets')

class PetById(Resource):
    def get(self, id):
        pet = Pet.query.filter(Pet.id == id).first()
        return make_response(pet.to_dict(), 200)
    
    def delete(self, id):
        pet = Pet.query.filter(Pet.id == id).first()

        if pet:
            db.session.delete(pet)
            db.session.commit()
            body = {}
            return make_response(body, 204)
        return {'error': 'Pet not found'}
    
    def patch(self, id):
        pet = Pet.query.filter(Pet.id == id).first()
        json = request.get_json()

        for attr in json:
            setattr(pet, attr, json[attr])
        db.session.add(pet)
        db.session.commit()
        pet_dict = pet.to_dict()
        response = make_response(
            pet_dict,
            200
        )
        return response
    
api.add_resource(PetById, '/pets/<int:id>')

class Reviews(Resource):
    def get(self):
        reviews = Review.query.all()
        response = make_response(
            jsonify([review.to_dict() for review in reviews]),
            200,
        )
        return response
    
    def post(self):
        json = request.get_json()
        new_review = Review(
            summary = json['summary'],
            rating = json['rating'],
            pet_id = json['pet_id'],
            service_id = json['service_id']
        )
        db.session.add(new_review)
        db.session.commit()
        review_dict = new_review.to_dict()
        response = make_response(
            jsonify(review_dict,201)
        )
        return response

api.add_resource(Reviews, '/reviews')

class Services(Resource):
    def get(self):
        services = Service.query.all()
        response = make_response(
            jsonify([service.to_dict() for service in services]),
            200,
        )
        return response
    def post(self):
        json = request.get_json()
        new_service = Service(
            service_name = json['service_name'],
            time = json['time'],
            image_url = json['image_url']
        )
        db.session.add(new_service)
        db.session.commit()
        service_dict = new_service.to_dict()
        response = make_response(
            jsonify(service_dict, 201)
        )
        return response
    
api.add_resource(Services, '/services')
    
if __name__ == '__main__':
    app.run(port=5555, debug=True)
