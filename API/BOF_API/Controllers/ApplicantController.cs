using System;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Data.SqlClient;
using System.Collections;
using nbi_api.Models;

namespace nbi_api.Controllers
{
    public class Planet
    {
        public int id;
        public string name;
        public string description;
        public string exploration;
        public string sizeAndDistance;
        public string orbitAndRotation;
        public string structure;
        public string formation;

        public Double distanceFromTheSun;
        public string periodOfRotation;
        public Double periodOfRevolution;
        public Double velocityOfRevolution;
        public Double dimater;
        public int knownSatellites;
    }

    public class ApplicantDetails
    {
        public Applicant applicant = new Applicant();
        public Application application = new Application();
        public Relationship relationship = new Relationship();
    }

    
    public class ApplicantController : ApiController
    {
        // GET: api/Planet
        public ArrayList Get()
        {
            ArrayList applicants = new ArrayList();

            SqlConnection conn = new SqlConnection();
            string connString = "Server=tcp:nbisqldatabase.database.windows.net,1433;Initial Catalog=nbi_sqldatabase;Persist Security Info=False;User ID=josephine.n.garduque;Password=Nics0319;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";
            conn.ConnectionString = connString;
            conn.Open();

            SqlDataReader reader = null;

            String sql = "Select * FROM Applicant";
            SqlCommand cmd = new SqlCommand(sql, conn);

            reader = cmd.ExecuteReader();

            while (reader.Read())
            {
                Applicant applicant = new Applicant();

                applicant.id = reader.GetInt32(0);
                applicant.fname = reader.GetString(1);
                applicant.mname = reader.GetString(2);
                applicant.lname = reader.GetString(3);
                applicant.birthday = reader.GetDateTime(4);
                applicant.gender = reader.GetString(5);
                applicant.civil_status = reader.GetString(6);
                applicant.highest_education = reader.GetString(7);

                applicant.landline_number = reader.GetString(8);
                applicant.mobile_number = reader.GetString(9);
                applicant.email = reader.GetString(10);
                applicant.complexion = reader.GetString(11);
                applicant.peculiarities = reader.GetString(12);
                applicant.religion = reader.GetString(13);
                applicant.height = reader.GetDouble(14);
                applicant.weight = reader.GetDouble(15);

                applicants.Add(applicant);
            }

            return applicants;
        }

        // GET: api/Planet/5
        public ApplicantDetails Get(int id)
        {
            SqlConnection conn = new SqlConnection();
            string connString = "Server=tcp:nbisqldatabase.database.windows.net,1433;Initial Catalog=nbi_sqldatabase;Persist Security Info=False;User ID=josephine.n.garduque;Password=Nics0319;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";
            conn.ConnectionString = connString;
            conn.Open();

            SqlDataReader reader = null;

            String sql = "Select * FROM Applicant " +
                "INNER JOIN Application " +
                    "ON Applicant.id=Application.application_id " +
                "INNER JOIN Relationship " +
                    "ON Applicant.id=Relationship.applicant_id " +
                "WHERE Applicant.id = " + id;

            SqlCommand cmd = new SqlCommand(sql, conn);
            
            reader = cmd.ExecuteReader();

            ApplicantDetails applicantDetails = new ApplicantDetails();

            while (reader.Read())
            {
                applicantDetails.applicant.id = reader.GetInt32(0);
                applicantDetails.applicant.fname = reader.GetString(1);
                applicantDetails.applicant.mname = reader.GetString(2);
                applicantDetails.applicant.lname = reader.GetString(3);
                applicantDetails.applicant.birthday = reader.GetDateTime(4);
                applicantDetails.applicant.gender = reader.GetString(5);
                applicantDetails.applicant.civil_status = reader.GetString(6);
                applicantDetails.applicant.highest_education = reader.GetString(7);

                applicantDetails.applicant.landline_number = reader.GetString(8);
                applicantDetails.applicant.mobile_number = reader.GetString(9);
                applicantDetails.applicant.email = reader.GetString(10);
                applicantDetails.applicant.complexion = reader.GetString(11);
                applicantDetails.applicant.peculiarities = reader.GetString(12);
                applicantDetails.applicant.religion = reader.GetString(13);
                applicantDetails.applicant.height = reader.GetDouble(14);
                applicantDetails.applicant.weight = reader.GetDouble(15);
                applicantDetails.applicant.image = reader.GetString(16);

                applicantDetails.application.branch = reader.GetString(19);
                applicantDetails.application.date = reader.GetDateTime(20);
                applicantDetails.application.valid_id = reader.GetString(21);
                applicantDetails.application.id_number = reader.GetString(22);

                applicantDetails.relationship.name = reader.GetString(25);
                applicantDetails.relationship.name_of_father = reader.GetString(26);
                applicantDetails.relationship.place_of_birth1 = reader.GetString(27);
                applicantDetails.relationship.name_of_mother = reader.GetString(28);
                applicantDetails.relationship.place_of_birth2 = reader.GetString(29);
            }

            return applicantDetails;
        }

        // POST: api/Planet
        public void Post([FromBody]ApplicantDetails ad)
        {
            SqlConnection conn = new SqlConnection();
            string connString = "Server=tcp:nbisqldatabase.database.windows.net,1433; Initial Catalog = nbi_sqldatabase; Persist Security Info = False; User ID = josephine.n.garduque; Password = Nics0319; MultipleActiveResultSets = False; Encrypt = True; TrustServerCertificate = False; Connection Timeout = 30; ";
            conn.ConnectionString = connString;
            conn.Open();

            String columns1 = "(fname, mname, lname, birthday, gender, civil_status, highest_education, landline_number, mobile_number, email, complexion, peculiarities, religion, height, weight, image)";
            String values1 = "('" + ad.applicant.fname + "','" + ad.applicant.mname + "','" + ad.applicant.lname + "','" + ad.applicant.birthday + "','" + ad.applicant.gender + "','" + ad.applicant.civil_status + "','" + ad.applicant.highest_education + "','" + ad.applicant.landline_number + "','" + ad.applicant.mobile_number + "','" + ad.applicant.email + "','" + ad.applicant.complexion + "','" + ad.applicant.peculiarities + "','" + ad.applicant.religion + "','" + ad.applicant.height + "','" + ad.applicant.weight + "','" + ad.applicant.image + "')";
            String sql1 = "INSERT INTO Applicant " + columns1 + " OUTPUT INSERTED.id VALUES " + values1;
            SqlCommand cmd1 = new SqlCommand(sql1, conn);
            int id = (int)cmd1.ExecuteScalar();

            String columns2 = "(applicant_id, name, name_of_father, place_of_birth1, name_of_mother, place_of_birth2)";
            String values2 = "('" + id + "','" + ad.relationship.name + "','" + ad.relationship.name_of_father + "','" + ad.relationship.place_of_birth1 + "','" + ad.relationship.name_of_mother + "','" + ad.relationship.place_of_birth2 + "')";
            String sql2 = "INSERT INTO Relationship " + columns2 + " VALUES " + values2;
            SqlCommand cmd2 = new SqlCommand(sql2, conn);
            cmd2.ExecuteNonQuery();

            String columns3 = "(application_id, branch, date, valid_id, id_number)";
            String values3 = "('" + id + "','" + ad.application.branch + "','" + ad.application.date + "','" + ad.application.valid_id + "','" + ad.application.id_number + "')";
            String sql3 = "INSERT INTO Application " + columns3 + " VALUES " + values3;
            SqlCommand cmd3 = new SqlCommand(sql3, conn);
            cmd3.ExecuteNonQuery();
        }

        // PUT: api/Planet/5
        public void Put([FromBody]ApplicantDetails ad)
        {
            SqlConnection conn = new SqlConnection();
            string connString = "Server=tcp:nbisqldatabase.database.windows.net,1433; Initial Catalog = nbi_sqldatabase; Persist Security Info = False; User ID = josephine.n.garduque; Password = Nics0319; MultipleActiveResultSets = False; Encrypt = True; TrustServerCertificate = False; Connection Timeout = 30; ";
            conn.ConnectionString = connString;
            conn.Open();

            string set1 = "fname = '" + ad.applicant.fname + "', mname = '" + ad.applicant.mname + "', lname = '" + ad.applicant.lname + "', birthday = '" + ad.applicant.birthday + "', gender = '" + ad.applicant.gender + "', civil_status = '" + ad.applicant.civil_status + "', highest_education = '" + ad.applicant.highest_education + "', landline_number = '" + ad.applicant.landline_number + "', mobile_number = '" + ad.applicant.mobile_number + "', email = '" + ad.applicant.email + "', complexion = '" + ad.applicant.complexion + "', peculiarities = '" + ad.applicant.peculiarities + "', religion = '" + ad.applicant.religion + "', height = '" + ad.applicant.height + "', weight = '" + ad.applicant.weight + "', image = '" + ad.applicant.image + "'";
            String sql1 = "UPDATE Applicant SET " + set1 + " WHERE id = " + ad.applicant.id;
            SqlCommand cmd1 = new SqlCommand(sql1, conn);
            cmd1.ExecuteNonQuery();

            string set2 = "name = '" + ad.relationship.name + "', name_of_father = '" + ad.relationship.name_of_father + "', place_of_birth1 = '" + ad.relationship.place_of_birth1 + "', name_of_mother = '" + ad.relationship.name_of_mother + "', place_of_birth2 = '" + ad.relationship.place_of_birth2 + "'";
            String sql2 = "UPDATE Relationship SET " + set2 + " WHERE applicant_id = " + ad.applicant.id;
            SqlCommand cmd2 = new SqlCommand(sql2, conn);
            cmd2.ExecuteNonQuery();

            string set3 = "branch = '" + ad.application.branch + "', date = '" + ad.application.date + "', valid_id = '" + ad.application.valid_id + "', id_number = '" + ad.application.id_number + "'";
            String sql3 = "UPDATE Application SET " + set3 + " WHERE application_id = " + ad.applicant.id;
            SqlCommand cmd3 = new SqlCommand(sql3, conn);
            cmd3.ExecuteNonQuery();
        }

        // DELETE: api/Planet/5
        public void Delete(int id)
        {
            SqlConnection conn = new SqlConnection();
            string connString = "Server=tcp:nbisqldatabase.database.windows.net,1433; Initial Catalog = nbi_sqldatabase; Persist Security Info = False; User ID = josephine.n.garduque; Password = Nics0319; MultipleActiveResultSets = False; Encrypt = True; TrustServerCertificate = False; Connection Timeout = 30; ";
            conn.ConnectionString = connString;
            conn.Open();

            String sql1 = "DELETE FROM Applicant WHERE id = " + id;
            SqlCommand cmd1 = new SqlCommand(sql1, conn);
            cmd1.ExecuteNonQuery();

            String sql2 = "DELETE FROM Relationship WHERE applicant_id = " + id;
            SqlCommand cmd2 = new SqlCommand(sql2, conn);
            cmd2.ExecuteNonQuery();

            String sql3 = "DELETE FROM Application WHERE application_id = " + id;
            SqlCommand cmd3 = new SqlCommand(sql3, conn);
            cmd3.ExecuteNonQuery();
        }
    }
}
