import Header from '../components/common/Header';
import UsersTable from '../components/users/UsersTable';

const Users = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Users" />

      <main className=" mx-auto py-6 px-4 lg:px-8">
        {/* TABLE */}
        <UsersTable />
      </main>
    </div>
  );
};

export default Users;
