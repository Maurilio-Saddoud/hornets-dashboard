/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      's.gravatar.com',
      'cdn.auth0.com',
      'lh3.googleusercontent.com', // For Google profile pictures
      'avatars.githubusercontent.com' // For GitHub profile pictures
    ],
  },
};

module.exports = nextConfig; 