import { auth, db } from "@/utils/firebase/Firebase";
import { Card, CardBody, CardHeader, User } from "@heroui/react";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";

const FollowSection: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  let currentUser: any;

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        currentUser = user;
        console.log(currentUser);
      }
    });
    const fetchUsers = async () => {
      const usersCollectionRef = collection(db, "users");
      const usersSnapshot = await getDocs(usersCollectionRef);
      const usersList = usersSnapshot.docs.map((doc) => doc.data());
      setUsers(usersList);
    };
    fetchUsers();
  }, []);

  return (
    <>
      <div className="px-5">
        <Card>
          <CardHeader className="border-b-1.5">
            <h4 className="text-lg font-bold">People to Follow:</h4>
          </CardHeader>
          <CardBody>
            {users
              .sort(() => Math.random() - Math.random())
              .slice(0, 15)
              .filter((user) => user.uid)
              .map((user) => (
                <div className="flex justify-start" key={user.uid}>
                  <Link href={"main/" + user.fullName + "/profile"}>
                    <User
                      name={user.fullName}
                      description="Click to check them out."
                      avatarProps={{
                        src: user.profilePicture,
                        alt: user.name,
                        className: "w-10 h-10",
                      }}
                    />
                  </Link>
                </div>
              ))}
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default FollowSection;
