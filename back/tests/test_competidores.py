import json
from unittest import TestCase

from faker import Faker
from faker.generator import random

from app import app


class TestCompetidores(TestCase):

    def setUp(self):
        self.data_factory = Faker()
        self.client = app.test_client()

        nuevo_usuario = {
            "usuario": self.data_factory.name(),
            "contrasena": self.data_factory.word(),
            "admin": True
        }

        solicitud_nuevo_usuario = self.client.post("/signin",
                                                   data=json.dumps(nuevo_usuario),
                                                   headers={'Content-Type': 'application/json'})

        respuesta_al_crear_usuario = json.loads(solicitud_nuevo_usuario.get_data())

        self.token = respuesta_al_crear_usuario["token"]
        self.usuario_code = respuesta_al_crear_usuario["id"]

    def test_editar_competidores(self):
        nuevo_evento = {
            "nombre": "Sakhir 2. 57 vueltas",
            "tipo": 'CARRERA',
            "deporte": "F1",
            "competidores": [
                {
                    "probabilidad": 0.5,
                    "competidor": self.data_factory.name()
                },
                {
                    "probabilidad": 0.5,
                    "competidor": self.data_factory.name()
                },
            ]
        }

        evento_editado = {
            "nombre": "Sakhir 2. 57 vueltas",
            "tipo": 'CARRERA',
            "deporte": "F1",
            "competidores": [
                {
                    "probabilidad": 0.6,
                    "competidor": self.data_factory.name()
                },
                {
                    "probabilidad": 0.4,
                    "competidor": self.data_factory.name()
                },
            ]
        }

        endpoint_crear_evento = "/usuario/{}/eventos".format(str(self.usuario_code))
        headers = {'Content-Type': 'application/json', "Authorization": "Bearer {}".format(self.token)}

        solicitud_nueva_evento_1 = self.client.post(endpoint_crear_evento,
                                                     data=json.dumps(nuevo_evento),
                                                     headers=headers)

        respuesta_al_crear_evento = json.loads(solicitud_nueva_evento_1.get_data())
        id_evento = respuesta_al_crear_evento["id"]

        endpoint_editar_evento = "/evento/{}".format(str(id_evento))

        solicitud_editar_evento = self.client.put(endpoint_editar_evento,
                                                   data=json.dumps(evento_editado),
                                                   headers=headers)

        evento_editada = json.loads(solicitud_editar_evento.get_data())

        self.assertEqual(solicitud_editar_evento.status_code, 200)
        self.assertEqual(evento_editada["nombre"], "Sakhir 2. 57 vueltas")

        nueva_evento = {
            "nombre": self.data_factory.sentence(),
            "tipo": 'CARRERA', 
            "deporte": self.data_factory.sentence(),  
            "competidores": [
                {
                    "probabilidad": 0.5,
                    "competidor": self.data_factory.name()
                },
                {
                    "probabilidad": 0.5,
                    "competidor": self.data_factory.name()
                },
            ]
        }

        endpoint_eventos = "/usuario/{}/eventos".format(str(self.usuario_code))
        headers = {'Content-Type': 'application/json', "Authorization": "Bearer {}".format(self.token)}

        solicitud_nueva_evento = self.client.post(endpoint_eventos,
                                                   data=json.dumps(nueva_evento),
                                                   headers=headers)

        id_evento = json.loads(solicitud_nueva_evento.get_data())["id"]
        solicitud_consultar_eventos_antes = self.client.get(endpoint_eventos, headers=headers)
        total_eventos_antes = len(json.loads(solicitud_consultar_eventos_antes.get_data()))

        endpoint_evento = "/evento/{}".format(str(id_evento))

        solicitud_eliminar_evento = self.client.delete(endpoint_evento, headers=headers)
        solicitud_consultar_eventos_despues = self.client.get(endpoint_eventos, headers=headers)
        total_eventos_despues = len(json.loads(solicitud_consultar_eventos_despues.get_data()))
        solicitud_consultar_evento_por_id = self.client.get(endpoint_evento, headers=headers)

        self.assertLess(total_eventos_despues, total_eventos_antes)
        self.assertEqual(solicitud_consultar_evento_por_id.status_code, 404)
        self.assertEqual(solicitud_eliminar_evento.status_code, 204)

    def test_competidores_no_validos(self):

        nuevo_evento = {
            "nombre": "Sakhir 3. 57 vueltas",
            "tipo": 'CARRERA',
            "deporte": "F1",
            "competidores": [
                {
                    "probabilidad": 0.7,
                    "competidor": self.data_factory.name()
                },
                {
                    "probabilidad": 0.5,
                    "competidor": self.data_factory.name()
                },
            ]
        }

        endpoint_eventos = "/usuario/{}/eventos".format(str(self.usuario_code))
        headers = {'Content-Type': 'application/json', "Authorization": "Bearer {}".format(self.token)}

        solicitud_nueva_evento = self.client.post(endpoint_eventos,
                                                   data=json.dumps(nuevo_evento),
                                                   headers=headers)

        self.assertEqual(solicitud_nueva_evento.status_code, 412)
