MusicRate to aplikacja, która pozwala użytkownikowi na:
-rejestrację i logowanie użytkowników,
-przeglądanie piosenek w liście(takie charts pod wzgledem ocen, przeglądanie rankingu na podstawie średnich ocen),
-dodawanie ocen do piosenek,
-dodawanie piosenek,
-skorzystanie z forma w sekcji kontakt
-jako admin(hasło-admin123) mozliwość wejscia na adminpanel gdzie mozna 


Frontend- React
Backend- express
Baza danych- mongoDB z Dockerem.


Podział pracy: 
Wojciech Syk:Stworzenie całej funkcji logowania, zrobienie Menu, dodanie funkcji obliczania średnich ocen wraz z auto-refreshem, Skonfigurowanie bazy danych i funkcjonalność danych z bazy we froncie, Funkcjonalność dodawania piosenek
Kacper Sobecki: Stworzenie systemu gwiazdek jako oceny, zaprojektowanie szczegółów piosenki, stowrzenie panelu rankingu na podstawie średnich ocen, Funkcjonalność dodawania piosenek
Baza Danych

+------------------+              +----------------------+
|     User         |              |        Song          |
+------------------+              +----------------------+
| _id: ObjectId    |<--+       +--| _id: ObjectId        |
| username: String |   |       |  | title: String        |
| password: String |   |       |  | artist: String       |
| role: String     |   +-------+--| ratings: [           |
+------------------+              |   {                  |
                                  |     userId: ObjectId |
                                  |     value: Number    |
                                  |   }, ...             |
                                  | ]                    |
                                  | averageRating: Number|
                                  +----------------------+

user                                                                                                                                          
{
  "_id": ObjectId,
  "username": "string",
  "password": "string (zahashowane)",
  "role": "user" | "admin"
}
song 
{
  "_id": ObjectId,
  "title": "string",
  "artist": "string",
  "ratings": [
    {
      "userId": ObjectId,
      "value": number (1-5)
    }
  ],
  "averageRating": number
}


