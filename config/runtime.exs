import Config

if Mix.env() in [:dev, :test] do
  DotenvParser.load_file(".env")
end

if System.get_env("PHX_SERVER") do
  config :lmx, LmxWeb.Endpoint, server: true
end

config :lmx, LmxWeb.Endpoint, http: [port: String.to_integer(System.get_env("PORT", "4000"))]

database_url =
  System.get_env("DATABASE_URL") ||
    raise """
    environment variable DATABASE_URL is missing.
    """

maybe_ipv6 = if System.get_env("ECTO_IPV6") in ~w(true 1), do: [:inet6], else: []

config :lmx, Lmx.Repo,
  # ssl: true,
  url: database_url,
  pool_size: String.to_integer(System.get_env("POOL_SIZE") || "10"),
  # For machines with several cores, consider starting multiple pools of `pool_size`
  # pool_count: 4,
  socket_options: maybe_ipv6

secret_key_base =
  System.get_env("SECRET_KEY_BASE") ||
    raise """
    environment variable SECRET_KEY_BASE is missing.
    You can generate one by calling: mix phx.gen.secret
    """

host = System.get_env("PHX_HOST") || "example.com"

config :lmx, :dns_cluster_query, System.get_env("DNS_CLUSTER_QUERY")

config :lmx, LmxWeb.Endpoint,
  url: [
    host: host,
    port: String.to_integer(System.get_env("PHX_PORT") || "4000"),
    scheme: System.get_env("PHX_SCHEME") || "https"
  ],
  http: [
    ip: {0, 0, 0, 0, 0, 0, 0, 0}
  ],
  secret_key_base: secret_key_base
