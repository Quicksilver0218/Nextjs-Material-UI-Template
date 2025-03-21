import type { NextConfig } from "next";

const yamlRule = {
  loaders: ["yaml-loader"],
  as: "*.js",
};

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
    turbo: {
      rules: {
        "*.yml": yamlRule,
        "*.yaml": yamlRule,
      },
    },
  },
  webpack: config => {
    config.module.rules.push({
      test: /\.ya?ml/,
      use: [
        {
          loader: "yaml-loader",
        },
      ],
    })
    return config
  },
};

export default nextConfig;
