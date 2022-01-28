# Login, Register and Logout

Use the endpoints from [this API](https://simplo-auth.herokuapp.com/) to perform login, register and logout.

#### Register endpoint: api/user/register/

```json
{
  "email": "",
  "first_name": "F N",
  "last_name": "L N",
  "phone": "234456789",
  "password": "JHJGHJ7838843UIR",
  "avatar": "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
}
```

#### Login endpoint: api/user/login/

```json
{
  "email": "test@email.com",
  "password": "JHJGHJ7838843UIR"
}
```

#### Login endpoint: api/user/logout/

```json
{
  "refresh_token": "refresh_token provided by api"
}
```

## Our Expectations:

- Host the web app on a free hosting provider
- Simple pages performing the mentioned actions

> > Estimated Time: 1 Week

#### The most important aspect of the tasks is how you document your work, provide setup instructions and share your thoughts with us about the development process including why you made specific decisions.
