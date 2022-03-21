# erus-challenge
-------------English---------------------------

54.164.92.196
port:3000

url: http://54.164.92.196:3000

this API evaluates nitrogenous bases received by a post, 
its behavior is as follows:

POST request

post: mutation url: http://54.164.92.196:3000/mutation

if the result is not a mutation returns 200-OK, 
if the result is a mutation returns 403-Forbidden, 
if the result dont is a valid nigrenous base (A,T,C,G) returns 406-Invalid request.

GET request

get: stats url: http://54.164.92.196:3000/stats
returns the count of mutations and non-mutations in addition to the ratio

get: list url: http://54.164.92.196:3000/list
returns a list of 10 request, whit the data: dates, nitrogenous bases and result of mutation.


-------------Español---------------------------

54.164.92.196
puerto: 3000

URL: http://54.164.92.196:3000

esta API evalúa bases nitrogenadas recibidas por un post,
su comportamiento es el siguiente:

Solicitud POST

publicación: URL de mutación: http://54.164.92.196:3000/mutation

si el resultado no es una mutación devuelve 200-OK,
si el resultado es una mutación devuelve 403-Prohibido,
si el resultado no es una base nigrenosa válida (A,T,C,G) devuelve 406-Solicitud no válida.

OBTENER solicitud

obtener: URL de estadísticas: http://54.164.92.196:3000/stats
devuelve el recuento de mutaciones y no mutaciones además de la proporción

obtener: URL de la lista: http://54.164.92.196:3000/list
devuelve una lista de 10 solicitudes, con los datos: fechas, bases nitrogenadas y resultado de la mutación.
