defmodule LmxWeb.Router do
  use LmxWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", LmxWeb do
    pipe_through :api
    resources "/users", UserController, except: [:new, :edit]
  end

  scope "/", LmxWeb do
    get "/*path", PageController, :index
  end
end
