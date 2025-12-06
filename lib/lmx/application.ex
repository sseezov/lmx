defmodule Lmx.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
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

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Lmx.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    LmxWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
