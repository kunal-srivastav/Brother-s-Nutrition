

export const cookieOption =  {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict"
};

export const accessTokenCookieOption = {
  ...cookieOption,
  maxAge:  60 * 30 * 1000
};

// Refresh token cookie (longer lived, persistent)
export const refreshTokenCookieOption = {
  ...cookieOption,
  maxAge: 5 * 24 * 60 * 60 * 1000,
};