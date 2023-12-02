const ProfileDropdown = ({
  name,
  email,
  phone,
  regd,
  handleLogout,
  handleDelAccount,
}) => {
  return (
    <>
      <div class="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
        <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
          <div>{name}</div>
          <div class="font-medium truncate">{email}</div>
        </div>
        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
          <li>
            <p class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer">
              {phone}
            </p>
          </li>
          <li>
            <p class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer">
              {regd}
            </p>
          </li>
          <li>
            <p
              href="#"
              class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
            >
              Settings
            </p>
          </li>
        </ul>
        <div class="py-2">
          <p
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer"
            onClick={handleLogout}
          >
            Sign out
          </p>
          <p
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer"
            onClick={handleDelAccount}
          >
            Delete Account
          </p>
        </div>
      </div>
    </>
  );
};

export default ProfileDropdown;
