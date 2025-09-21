const Icons = {
  ShoppingCart: ({ size = 24, color = "currentColor", ...props }) => (
    <svg
      width="22"
      height="20"
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.25 0.25C0.835786 0.25 0.5 0.585786 0.5 1C0.5 1.41421 0.835786 1.75 1.25 1.75H2.63568C2.80558 1.75 2.95425 1.86422 2.99803 2.02838L5.55576 11.6199C3.94178 12.0385 2.75 13.5051 2.75 15.25C2.75 15.6642 3.08579 16 3.5 16H19.25C19.6642 16 20 15.6642 20 15.25C20 14.8358 19.6642 14.5 19.25 14.5H4.37803C4.68691 13.6261 5.52034 13 6.5 13H17.7183C18.0051 13 18.2668 12.8364 18.3925 12.5785C19.5277 10.249 20.5183 7.83603 21.3527 5.35126C21.4191 5.15357 21.4002 4.93716 21.3005 4.75399C21.2008 4.57082 21.0294 4.43743 20.8273 4.38583C16.0055 3.15442 10.9536 2.5 5.75 2.5C5.39217 2.5 5.03505 2.5031 4.67868 2.50926L4.44738 1.64188C4.2285 0.821088 3.48515 0.25 2.63568 0.25H1.25Z"
        fill="#10151F"
      />
      <path
        d="M2.75 18.25C2.75 17.4216 3.42157 16.75 4.25 16.75C5.07843 16.75 5.75 17.4216 5.75 18.25C5.75 19.0784 5.07843 19.75 4.25 19.75C3.42157 19.75 2.75 19.0784 2.75 18.25Z"
        fill="#10151F"
      />
      <path
        d="M15.5 18.25C15.5 17.4216 16.1716 16.75 17 16.75C17.8284 16.75 18.5 17.4216 18.5 18.25C18.5 19.0784 17.8284 19.75 17 19.75C16.1716 19.75 15.5 19.0784 15.5 18.25Z"
        fill="#10151F"
      />
    </svg>
  ),

  Close: ({ size = 24, color = "currentColor", ...props }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  ),

  ShoppingCartOutline: ({ size = 24, color = "currentColor", ...props }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5H2M7 13v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4M7 13L5 7" />
      <circle cx="9" cy="20" r="1" />
      <circle cx="20" cy="20" r="1" />
    </svg>
  ),

  ArrowDown: ({ size = 24, color = "currentColor", ...props }) => (
    <svg
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.21967 0.21967C0.512563 -0.0732233 0.987437 -0.0732233 1.28033 0.21967L5 3.93934L8.71967 0.219671C9.01256 -0.0732226 9.48744 -0.0732225 9.78033 0.219671C10.0732 0.512564 10.0732 0.987438 9.78033 1.28033L5.53033 5.53033C5.38968 5.67098 5.19891 5.75 5 5.75C4.80109 5.75 4.61032 5.67098 4.46967 5.53033L0.21967 1.28033C-0.0732233 0.987437 -0.0732233 0.512563 0.21967 0.21967Z"
        fill="#10151F"
      />
    </svg>
  ),

  LoggOut: ({ size = 24, color = "currentColor", ...props }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      class="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
      />
    </svg>
  ),

  User: ({ size = 24, color = "currentColor", ...props }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" />
    </svg>
  ),
};

export const { ShoppingCart, Close, ShoppingCartOutline, User, ArrowDown, LoggOut } =
  Icons;
