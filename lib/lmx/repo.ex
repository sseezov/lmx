defmodule Lmx.Repo do
  use Ecto.Repo,
    otp_app: :lmx,
    adapter: Ecto.Adapters.Postgres
end
