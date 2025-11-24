import type { BoardProps, ClassProps, SubjectProps } from "@/types/types";
import { createListCollection } from "@chakra-ui/react";

export const getClassFramework = (classes: ClassProps[]) => 
    createListCollection({
        items: classes.map((c) => ({
            label: c.props.name,
            value: c.props.code,
        })),
    });

export const getSubjectFramework = (subjects: SubjectProps[]) =>
    createListCollection({
        items: subjects.map((s) => ({
            label: s.props.name,
            value: s.props.code,
        })),
    });

export const getBoardFramework = (boards: BoardProps[]) =>
    createListCollection({
        items: boards.map((b) => ({
            label: b.props.shortName,
            value: b.props.code,
        })),
    });