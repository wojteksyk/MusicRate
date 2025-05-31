Lepiej pobrac do txt bo tutaj sie dziwnie wyswietla

MusicRate

Opis aplikacji

MusicRate to aplikacja webowa pozwalająca użytkownikom na:

* Dodawanie i przeglądanie utworów muzycznych,
* Ocenianie piosenek w skali 1–5 gwiazdek,
* Wyświetlanie rankingu najlepiej ocenianych utworów,
* Rejestrację i logowanie użytkowników(kod uwietrzytelniający - 123),
* Jako admin(hasło-admin123) mozliwość wejscia na adminpanel gdzie mozna usunać piosenkę i zobaczyć uzytkowników,
* Formularz kontaktowy.

Technologie:

Frontend- React
Backend- express
Baza danych- mongoDB z Dockerem.

Podział pracy: 

Wojciech Syk:

Stworzenie całej funkcji logowania, zrobienie Menu, dodanie funkcji obliczania średnich ocen wraz z auto-refreshem, Skonfigurowanie bazy danych i funkcjonalność danych z bazy we froncie, Funkcjonalność dodawania piosenek, adminpanel

Kacper Sobecki:
 
Stworzenie systemu gwiazdek jako oceny, zaprojektowanie szczegółów piosenki, stowrzenie panelu rankingu na podstawie średnich ocen, Funkcjonalność dodawania piosenek Baza Danych

Struktura bazy danych (MongoDB)

Kolekcja: `users`


{
  _id: ObjectId,
  username: String,
  email: String,
  password: String (hash),
  role: String ('user' | 'admin')
}


Kolekcja: `songs`
{
  _id: ObjectId,
  title: String,
  artist: String,
  ratings: [
    {
      userId: ObjectId (ref: User),
      value: Number
    }
  ],
  averageRating: Number
}

Testowanie

* Przetestowano logowanie, rejestrację, dodawanie piosenek, ocenianie,
* Przetestowano poprawność działania rankingu,
* Pokryto testami logikę backendu (ocenianie),
* Przetestowano wyświetlanie toastów, obsługę błędów,
* Sprawdzono responsywność na desktopie i urządzeniach mobilnych.

Dodatkowe

* Projekt wersjonowany w Git (GitHub), z regularnymi commitami,
* Inne: Docker, fixtures.

Panel administratora

* Możliwość podglądu listy użytkowników,
* Możliwość usuwania kont,
* Dalsza rozbudowa o statystyki aplikacji.

Zaprojektowano i zrealizowano zgodnie z wymaganiami projektu zaliczeniowego.


Installation Guide

git clone https://github.com/wojteksyk/MusicRate
cd MusicRate/project_AW
cd frontend
npm install
cd ..
cd backend
npm install
cd ..
(z poziomu project_AW)
docker-compose up --build
docker-compose restart
docker-compose exec backend npm run load-fixtures

Aplikacja:
- frontend działa na http://localhost:3000
- backend działa na http://localhost:5000
