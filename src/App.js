import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Home from './views/Home'
import UserForm from './views/users/UserForm'
import Users from './views/users/Users'
import NotFound from './views/errors/NotFound'
import Posts from './views/posts/Posts'
import PostForm from './views/posts/PostForm'
import Articles from './views/articles/Articles'
import ArticleForm from './views/articles/ArticleForm'
import Weather from './views/weather/Weather'

const App = () => {
  const { variant, showAlert, message } = useSelector(state => state.app.alert)

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/users">
          <Users />
        </Route>
        <Route exact path="/users/create">
          <UserForm action="create" />
        </Route>
        <Route exact path="/users/:uuid/edit">
          <UserForm action="edit" />
        </Route>
        <Route exact path="/posts">
          <Posts />
        </Route>
        <Route exact path="/posts/create">
          <PostForm action="create" />
        </Route>
        <Route exact path="/posts/:id/edit">
          <PostForm action="edit" />
        </Route>
        <Route exact path="/articles">
          <Articles />
        </Route>
        <Route exact path="/articles/create">
          <ArticleForm action="create" />
        </Route>
        <Route exact path="/articles/:id/edit">
          <ArticleForm action="edit" />
        </Route>
        <Route exact path="/weather">
          <Weather />
        </Route>
        <Route exact path="/404-page-not-found">
          <NotFound />
        </Route>
        <Route path="*">
          <Redirect to="/404-page-not-found" />
        </Route>
      </Switch>

      {showAlert && (
        <div className={`alert ${variant}`}>
          <p>{message}</p>
        </div>
      )}
    </BrowserRouter>
  )
}

export default App
