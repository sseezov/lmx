defmodule LmxWeb.Router do
  use LmxWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", LmxWeb do
    get "/*path", PageController, :index
  end

  scope "/api", LmxWeb do
    # Здесь позже будут API-роуты
  end
end
