import React from 'react';

interface BookmarksIconProps extends React.SVGProps<SVGSVGElement> {}

export const BookmarksIcon: React.FC<BookmarksIconProps> = (props) => {
  return (
    <>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
          d="M16 14.046v-2.497c0-2.145 0-3.217-.586-3.883C14.828 7 13.886 7 12 7c-1.886 0-2.828 0-3.414.666C8 8.332 8 9.404 8 11.55v2.497c0 1.548 0 2.322.326 2.66a.95.95 0 00.562.29c.438.056.95-.453 1.975-1.473.453-.45.68-.676.942-.736a.883.883 0 01.39 0c.262.06.489.285.942.736 1.024 1.02 1.537 1.53 1.976 1.473a.95.95 0 00.56-.29c.327-.338.327-1.112.327-2.66z"
          stroke="#1C274D"
          strokeWidth="1.5"
        />
        <path
          d="M7 3.338A9.954 9.954 0 0112 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12c0-1.821.487-3.53 1.338-5"
          stroke="#1C274D"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </>
  );
};
