import { PrismaClient } from '@prisma/client'
import { useEffect } from 'react';

const prisma = new PrismaClient()

export default async function handler(req, res) {
    if (req.method === 'POST') {

        const { studentNumber } = req.body;

        try {

            const ueIds = [1, 2, 3, 4, 5];

            const results = {};

            for (const ueId of ueIds) {

                // moyenne élève
                const subjectGrades = {};
                // moyenne classe
                const classSubjectGradesAvg = {};

                // moyenne élève
                const studentUE = await prisma.$queryRaw`
                SELECT grades.studentGrade,gradeslist.subject, coefue.coef FROM grades
                INNER JOIN gradeslist ON gradeslist.id = grades.gradeId
                INNER JOIN mcc ON mcc.id = gradeslist.skill
                INNER JOIN coefue ON coefue.idEcts = mcc.id
                INNER JOIN ue ON ue.id = coefue.idUE
                WHERE ue.id = ${ueId} AND grades.studentNumber = ${studentNumber};
                `;

                // moyenne classe
                const classGradesAvg = await prisma.$queryRaw`
                SELECT gradeslist.avg, gradeslist.subject, coefue.coef FROM grades
                INNER JOIN gradeslist ON gradeslist.id = grades.gradeId
                INNER JOIN mcc ON mcc.id = gradeslist.skill
                INNER JOIN coefue ON coefue.idEcts = mcc.id
                INNER JOIN ue ON ue.id = coefue.idUE
                WHERE ue.id = ${ueId};
                `;

                // moyenne élève
                studentUE.forEach(entry => {
                    const subject = entry.subject;
                    let grade;
                    if (entry.studentGrade == 'ABI') {
                        grade = 0;
                    }
                    else if (entry.studentGrade == 'ABJ' || entry.studentGrade == '') {
                        grade = 0;
                    }
                    else {
                        grade = parseFloat(entry.studentGrade.replace(',', '.'));
                    }

                    const coef = parseFloat(entry.coef);

                    if (!subjectGrades[subject]) {
                        subjectGrades[subject] = {
                            totalGrade: 0,
                            count: 0,
                        };
                    }

                    subjectGrades[subject].totalGrade += grade;
                    if (entry.studentGrade != 'ABJ' && entry.studentGrade != ''){
                        subjectGrades[subject].count += 1;
                    }
                    subjectGrades[subject].coef = coef;
                });

                // moyenne classe
                classGradesAvg.forEach(entry => {
                    const subject = entry.subject;
                    const grade = parseFloat(entry.avg.replace(',', '.'));
                    const coef = parseFloat(entry.coef);

                    if (!classSubjectGradesAvg[subject]) {
                        classSubjectGradesAvg[subject] = {
                            totalGrade: 0,
                            count: 0,
                        };
                    }
                    classSubjectGradesAvg[subject].totalGrade += grade;
                    classSubjectGradesAvg[subject].count += 1;
                    classSubjectGradesAvg[subject].coef = coef;
                });

                // moyenne élève
                const averages = {};
                // moyenne classe
                const classAverages = {};

                // moyenne élève
                Object.keys(subjectGrades).forEach(subject => {
                    const totalGrade = subjectGrades[subject].totalGrade;
                    const count = subjectGrades[subject].count;
                    const coef = subjectGrades[subject].coef;

                    averages[subject] = {
                        avgGrade: ((totalGrade / count) * coef).toFixed(2),
                        coef: coef
                    };
                });

                // moyenne classe
                Object.keys(classSubjectGradesAvg).forEach(subject => {
                    const totalGrade = classSubjectGradesAvg[subject].totalGrade;
                    const count = classSubjectGradesAvg[subject].count;
                    const coef = classSubjectGradesAvg[subject].coef;

                    classAverages[subject] = {
                        avgGrade: ((totalGrade / count) * coef).toFixed(2),
                        coef: coef
                    };
                });

                // moyenne élève
                let totalAvgGradeSum = 0;
                let totalCoefSum = 0;

                // moyenne classe
                let classTotalAvgGradeSum = 0;
                let classtTotalCoefSum = 0;

                // moyenne élève
                Object.values(averages).forEach(subject => {
                    totalAvgGradeSum += parseFloat(subject.avgGrade);
                    totalCoefSum += subject.coef;
                });

                // moyenne classe
                Object.values(classAverages).forEach(subject => {
                    classTotalAvgGradeSum += parseFloat(subject.avgGrade);
                    classtTotalCoefSum += subject.coef;
                });

                results[`ue${ueId}`] = {
                    result: totalAvgGradeSum / totalCoefSum,
                    sum: totalAvgGradeSum,
                    coef: totalCoefSum,
                    resum: averages,
                    avg: classTotalAvgGradeSum / totalCoefSum
                };

            }

            res.status(200).json(results);

        } catch (error) {
            res.status(400).json({ message: "Database request failed", error: error.message });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}