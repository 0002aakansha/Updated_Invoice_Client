import fetchClientProjects from "@/axios/api/fetchProjects";
import { childrenProps, projectContextType, projectType } from "@/types/types";
import { createContext, useState } from "react";

const projectContextDefaultValues: projectContextType = {
    
};

export const ProjectContext = createContext<projectContextType>(projectContextDefaultValues);

export default function ProjectProvider({ children }: childrenProps) {
    const [isLoading, setLoading] = useState(false);
    const [projects, setProjects] = useState<projectType[]>();
    const [hidden, sethidden] = useState<boolean>(true);

    const setHidden = (value: boolean) => {
        sethidden(value)
        setProjects([])
    }

    const fetchProjects = async (id: string) => {
        const projects = await fetchClientProjects(id)
        setProjects(projects)
    }

    const setIsLoading = (value: boolean) => {
        setLoading(value)
    }

    const value = {
        projects,
        isLoading,
        hidden,
        fetchProjects,
        setIsLoading,
        setHidden
    }
    return (
        <ProjectContext.Provider value={value}>
            {children}
        </ProjectContext.Provider>
    )
}
