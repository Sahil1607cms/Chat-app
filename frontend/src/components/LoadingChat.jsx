import { Users } from "lucide-react";

const LoadingChat = () => {
  // Create 8 skeleton items
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside
      className="h-full w-full max-w-md bg-gray-700 rounded-2xl
    flex flex-col "
    >
      {/* Header */}
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6" />
          <span className="font-medium">Contacts</span>
        </div>
      </div>

      {/* Skeleton Contacts */}
      <div className="overflow-y-auto w-full py-3">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="w-full p-3 flex items-center gap-5">
            {/* Avatar skeleton */}
              <div className="skeleton size-12 rounded-full" />

            <div className="flex flex-col"> 
              <div className="skeleton h-4 w-52 mb-2" />
              <div className="skeleton h-3 w-16" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default LoadingChat;