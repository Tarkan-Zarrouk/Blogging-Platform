const SignOutIcon:React.FC = () => {
  return (
    <svg
    width="30"
    className="relative right-[6px]"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.25 5.25L9 4.5h9l.75.75v13.5l-.75.75H9l-.75-.75V16.5h1.5V18h7.5V6h-7.5v1.5h-1.5V5.25z"
        fill="red"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.06 12.75h7.19v-1.5H7.06l1.72-1.72-1.06-1.06L4.19 12l3.53 3.53 1.06-1.06-1.72-1.72z"
        fill="red"
      />
    </svg>
  );
};

export default SignOutIcon;