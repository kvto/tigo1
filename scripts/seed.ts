import "dotenv/config";
import {drizzle} from "drizzle-orm/neon-http";
import {neon} from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, {schema});

const main = async() => {
    try {
        console.log("Sedding database")
        await db.delete(schema.courses);
        await db.delete(schema.userProgress);
        await db.delete(schema.units);
        await db.delete(schema.lessons);
        await db.delete(schema.challenges);
        await db.delete(schema.challengeOptions);
        await db.delete(schema.challengeProgress);

        await db.insert(schema.courses).values([
            {
                id: 1,
                title: "Español",
                imageSrc: "/es.svg",
            },
            {
                id: 2,
                title: "Italiano",
                imageSrc: "/it.svg",
            },
            {
                id: 3,
                title: "Frances",
                imageSrc: "/fr.svg",
            },
            {
                id: 4,
                title: "Croata",
                imageSrc: "/hr.svg",
            },
            {
                id: 5,
                title: "Japones",
                imageSrc: "/jp.svg",
            }
        ]);

        await db.insert(schema.units).values([
            {
                id: 1,
                courseId: 1, //Español
                title: "Unidad 1",
                description: "Aprender lo basico de Español",
                order: 1,
            }
        ]);

        await db.insert(schema.lessons).values([
            {
                id: 1,
                unitId: 1, // unidad 1 Aprender lo basico de Español,
                order: 1,
                title: "Sustantivos"
            },
            {
                id: 2,
                unitId: 1, // unidad 1 Aprender lo basico de Español,
                order: 2,
                title: "Verbos"
            }
        ]);

        await db.insert(schema.challenges).values([
            {
                id: 1,
                lessonId: 1, //sustantivos
                type: "SELECT",
                order: 1,
                question: "Cual de estas sentencias es 'the men'"
            },
            {
                id: 2,
                lessonId: 1, //sustantivos
                type: "ASSIST",
                order: 2,
                question: "'the men'"
            },
            {
                id: 3,
                lessonId: 1, //sustantivos
                type: "SELECT",
                order: 3,
                question: "Cual de estas sentencias es 'the robot'"
            }
        ]);

        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 1, //Cual de estas sentencias es el 'hombre'
                imageSrc: "/man.svg",
                correct: true,
                text: "el hombre",
                audioSrc: "/es_man.mp3"
            },
            {
                challengeId: 1, //Cual de estas sentencias es el 'hombre'
                imageSrc: "/woman.svg",
                correct: false,
                text: "el mujer",
                audioSrc: "/es_woman.mp3"
            },
            {
                challengeId: 1, //Cual de estas sentencias es el 'hombre'
                imageSrc: "/robot.svg",
                correct: false,
                text: "el robot",
                audioSrc: "/es_robot.mp3"
            }
        ])

        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 2, // 'hombre'
                correct: true,
                text: "el hombre",
                audioSrc: "/es_man.mp3"
            },
            {
                challengeId: 2, //'hombre'
                correct: false,
                text: "el mujer",
                audioSrc: "/es_woman.mp3"
            },
            {
                challengeId: 2, // 'hombre'
                correct: false,
                text: "el robot",
                audioSrc: "/es_robot.mp3"
            }
        ])


        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 3, //Cual de estas sentencias es el 'robot'
                imageSrc: "/man.svg",
                correct: false,
                text: "el hombre",
                audioSrc: "/es_man.mp3"
            },
            {
                challengeId: 3, //Cual de estas sentencias es el 'robot'
                imageSrc: "/woman.svg",
                correct: false,
                text: "el mujer",
                audioSrc: "/es_woman.mp3"
            },
            {
                challengeId: 3, //Cual de estas sentencias es el 'robot'
                imageSrc: "/robot.svg",
                correct: true,
                text: "el robot",
                audioSrc: "/es_robot.mp3"
            }
        ])

        await db.insert(schema.challenges).values([
            {
                id: 4,
                lessonId: 2, //verbos
                type: "SELECT",
                order: 1,
                question: "Cual de estas sentencias es 'the men'"
            },
            {
                id: 5,
                lessonId: 2, //verbos
                type: "ASSIST",
                order: 2,
                question: "'the men'"
            },
            {
                id: 6,
                lessonId: 2, //verbos
                type: "SELECT",
                order: 3,
                question: "Cual de estas sentencias es 'the robot'"
            }
        ]);
        console.log("Seeding finished");
    } catch {
        
    }
}

main();