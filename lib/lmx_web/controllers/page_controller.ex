defmodule LmxWeb.PageController do
  use LmxWeb, :controller

  def index(conn, _params) do
    send_file(conn, 200, "priv/static/frontend/index.html")
  end
end
