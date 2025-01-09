#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Pet, Review, Service

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        

        print("Deleting all records...")
        Pet.query.delete()
        Review.query.delete()
        Service.query.delete()

        print("Creating pets...")
        services = []
        servicenames = []
        pets = []
        names = []
        for i in range(10):
            name = fake.first_name()
            while name in names:
                name = fake.first_name()
            names.append(name)
            pet = Pet(
                name = name,
                age = randint(1,12),
                species = fake.last_name(),
                image_url = fake.image_url()
            )
            pets.append(pet)
        db.session.add_all(pets)
        db.session.commit()

        print("Creating services...")
        
        for i in range(6):
            servicename = fake.first_name()
            while servicename in servicenames:
                servicename = fake.first_name()
            servicenames.append(servicename)
            service = Service(
                service_name = servicename,
                time = randint(10, 45),
                image_url = fake.image_url()
                )
            services.append(service)
        db.session.add_all(services)
        db.session.commit()
        print("complete")

        print("Creating reviews...")
        reviews = []
        for i in range(20):
            content = fake.paragraph(nb_sentences=1)

            review = Review(
                summary = content,
                rating = randint(1,5),
                service_id = fake.random_element(elements=[service.id for service in services]),
                pet_id = fake.random_element(elements=[pet.id for pet in pets]),
            )
            reviews.append(review)
        db.session.add_all(reviews)
        db.session.commit()






       
