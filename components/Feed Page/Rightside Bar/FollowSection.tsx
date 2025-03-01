import { Card, CardBody, CardHeader } from "@heroui/react";
import { useState, useEffect } from "react";

const FollowSection: React.FC = () => {
  return (
    <>
      <div className="px-5">
        <Card>
          <CardHeader className="border-b-1.5">
            <h4 className="text-lg font-bold">People to Follow:</h4>
          </CardHeader>
          <CardBody>
            *INSERT USER PROFILES HERE* (Will extend with maximum 20 users,
            refresh randomizes it)
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default FollowSection;
