defmodule Lmx.Application do
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      LmxWeb.Telemetry,
      Lmx.Repo,
      {DNSCluster, query: Application.get_env(:lmx, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: Lmx.PubSub},
      # Start a worker by calling: Lmx.Worker.start_link(arg)
      # {Lmx.Worker, arg},
      # Start to serve requests, typically the last entry
      LmxWeb.Endpoint
    ]

    opts = [strategy: :one_for_one, name: Lmx.Supervisor]
    Supervisor.start_link(children, opts)
  end

  @impl true
  def config_change(changed, _new, removed) do
    LmxWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
