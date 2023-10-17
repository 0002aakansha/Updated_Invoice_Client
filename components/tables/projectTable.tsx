import { useSelector } from "react-redux";
import { AppState } from "../store/store";
import { projectStateType } from "@/types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUserPen } from "@fortawesome/free-solid-svg-icons";
import NotFound from "../alerts/notFound";
import { useState } from "react";
import UpdateProjectModal from "../modals/updateProjectModal";
import AlertDialogExample from "../alerts/AlertDialog";
import FullPageLoader from "../spinners/fullPageLoader";

const ProjectTable = () => {
  const [_id, setId] = useState("");
  const [cid, setcid] = useState("");

  const projects = useSelector<AppState>(
    (state) => state.project
  ) as projectStateType;
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);

  return (
    <>
      {projects.isLoading && <FullPageLoader />}
      {!projects.isLoading && !projects?.projects?.length ? (
        <NotFound
          title="Not Found"
          description="There are 0 projects. Please create project first!"
        />
      ) : (
        <div className="bg-stone-50 shadow-sm my-4 mx-auto">
          <table className="table w-full shadow-md overflow-hidden rounded-t-lg">
            <thead>
              <tr className="bg-[#5a51be] text-stone-50">
                <th className="py-3 px-4 font-semibold uppercase">S. No.</th>
                <th className="py-3 px-4 text-start font-semibold uppercase">
                  description
                </th>
                <th className="py-3 px-4 text-start font-semibold uppercase">
                  client
                </th>
                <th className="py-3 px-4 text-center font-semibold uppercase">
                  project amount
                </th>
                <th className="py-3 px-4 text-center font-semibold uppercase">
                  rate
                </th>
                <th className="py-3 px-4 text-center font-semibold uppercase">
                  conversion rate
                </th>
                <th className="py-3 px-4 text-center font-semibold uppercase">
                  actions
                </th>
              </tr>
            </thead>
            <tbody>
              {projects?.projects?.map((project, i) => (
                <tr
                  key={project?._id}
                  className="w-full border-b even:bg-slate-100"
                >
                  <td className="text-center py-3 font-semibold w-[5%]">{i + 1}.</td>
                  <td className="py-3 px-4 text-start font-semibold text-slate-700 capitalize w-[25%]">
                    {project?.description}
                  </td>
                  <td className="py-3 px-4 text-start text-sm  text-slate-700 capitalize w-[25%]">
                    ({project?.projectBelongsTo?.name})
                  </td>
                  <td className="py-3 px-4 text-center text-slate-600 text-sm w-[15%]">
                    {project?.projectAmount} INR
                  </td>
                  <td className="py-3 px-4 text-center text-slate-600 text-sm w-[10%]">
                    {project?.rate?.rate} {project?.rate?.currency}
                  </td>
                  <td className="py-3 px-4 text-center text-slate-600 text-sm w-[10%]">
                    {project?.conversionRate ? project?.conversionRate : <span className="text-red-500 font-semibold">N/A</span>}
                  </td>
                  <td className="py-3 text-center cursor-pointer space-x-10 w-[10%]">
                    <FontAwesomeIcon
                      icon={faUserPen}
                      style={{ color: "#5d6f99" }}
                      className="text-lg"
                      onClick={() => {
                        setUpdateOpen(true);
                        setId(project?._id);
                      }}
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ color: "#ed0707" }}
                      className="text-lg"
                      onClick={() => {
                        setDeleteOpen(true);
                        setId(project?._id);
                        setcid(project?.projectBelongsTo?._id)
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <UpdateProjectModal
        isOpen={updateOpen}
        onClose={setUpdateOpen}
        _id={_id}
      />
      <AlertDialogExample
        isOpen={deleteOpen}
        onClose={setDeleteOpen}
        filter="projectDelete"
        _id={_id}
        cid={cid}
      />
    </>
  );
};

export default ProjectTable;
