using Dapper;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using FastMember;
using System.IO;

namespace sc.data
{
    public class DbContext
    {
        private string _connString;

        public DbContext(string connStringName)
        {
            var configurationBuilder = new ConfigurationBuilder();
            var path = Path.Combine(Directory.GetCurrentDirectory(), "appsettings.json");
            configurationBuilder.AddJsonFile(path, false);

            var root = configurationBuilder.Build();
            _connString = root.GetSection("ConnectionStrings").GetSection("DefaultConnection").Value;
            var appSetting = root.GetSection("ApplicationSettings");
        }

        private IDbConnection OpenConnection()
        {
            return new SqlConnection(this._connString);
        }

        #region synchronous methods

        public IEnumerable<T> ExecuteAsList<T>(string query, Parameters p = null)
        {
            using (var con = OpenConnection())
            {
                return con.Query<T>(query, p == null ? null : p.Params, commandType: CommandType.StoredProcedure);
            }
        }

        public T ExecuteAsObject<T>(string query, Parameters p = null)
        {
            using (var con = OpenConnection())
            {
                return con.QuerySingleOrDefault<T>(query, p == null ? null : p.Params, commandType: CommandType.StoredProcedure);
            }
        }

        public int ExecuteNonQuery(string query, Parameters p = null)
        {
            using (var con = OpenConnection())
            {
                return con.Execute(query, p == null ? null : p.Params, commandType: CommandType.StoredProcedure);
            }
        }

        public DbResult ExecuteDbResult(string query, Parameters p = null)
        {
            p.Params.Add("@IsDbSuccess", dbType: DbType.Boolean, direction: ParameterDirection.Output);
            p.Params.Add("@DbMessage", dbType: DbType.String, size: 256, direction: ParameterDirection.Output);

            using (var con = OpenConnection())
            {
                con.Execute(query, p == null ? null : p.Params, commandType: CommandType.StoredProcedure);
                return new DbResult
                {
                    IsDbSuccess = p.Get<bool>("@IsDbSuccess"),
                    DbMessage = p.Get<string>("@DbResult")
                };
            }
        }

        public DapperDataReader ExecuteMultiple(string query, Parameters p = null)
        {
            var con = OpenConnection();
            var reader = con.QueryMultiple(query, p == null ? null : p.Params, commandType: CommandType.StoredProcedure);

            return new DapperDataReader
            {
                Reader = reader,
                Connection = con
            };
        }

        public DbResult BulkCopy<T>(List<T> data, string[] columns, string tableName, int bulkCopyTimeout, int batchSize)
        {
            using (var con = new SqlConnection(_connString))
            {
                con.Open();
                using (var bulkCopy = new SqlBulkCopy(con))
                {
                    using (var reader = ObjectReader.Create(data, columns))
                    {
                        bulkCopy.DestinationTableName = tableName;
                        bulkCopy.BulkCopyTimeout = bulkCopyTimeout;
                        bulkCopy.BatchSize = batchSize;

                        bulkCopy.WriteToServer(reader);
                    }
                }
                con.Close();
                return new DbResult
                {
                    IsDbSuccess = true,
                    DbMessage = "Bulk copy successful",
                    ReturnId = 0
                };
            }
        }

        #endregion

        #region asynchronous methods

        public async Task<IEnumerable<T>> ExecuteAsListAsync<T>(string query, Parameters p = null)
        {
            using (var con = OpenConnection())
            {
                return await con.QueryAsync<T>(query, p == null ? null : p.Params, commandType: CommandType.StoredProcedure);
            }
        }

        public async Task<T> ExecuteAsObjectAsync<T>(string query, Parameters p = null)
        {
            using (var con = OpenConnection())
            {
                return await con.QuerySingleOrDefaultAsync<T>(query, p == null ? null : p.Params, commandType: CommandType.StoredProcedure);
            }
        }

        public async Task<int> ExecuteNonQueryAsync(string query, Parameters p = null)
        {
            using (var con = OpenConnection())
            {
                return await con.ExecuteAsync(query, p == null ? null : p.Params, commandType: CommandType.StoredProcedure);
            }
        }

        public async Task<DbResult> ExecuteDbResultAsync(string query, Parameters p = null)
        {
            p.Params.Add("@IsDbSuccess", dbType: DbType.Boolean, direction: ParameterDirection.Output);
            p.Params.Add("@DbMessage", dbType: DbType.String, size: 256, direction: ParameterDirection.Output);

            using (var con = OpenConnection())
            {
                await con.ExecuteAsync(query, p == null ? null : p.Params, commandType: CommandType.StoredProcedure);
                return new DbResult
                {
                    IsDbSuccess = p.Get<bool>("@IsDbSuccess"),
                    DbMessage = p.Get<string>("@DbMessage")
                };
            }
        }

        public async Task<DapperDataReader> ExecuteMultipleAsync(string query, Parameters p = null)
        {
            var con = OpenConnection();
            var reader = await con.QueryMultipleAsync(query, p == null ? null : p.Params, commandType: CommandType.StoredProcedure);

            return new DapperDataReader
            {
                Reader = reader,
                Connection = con
            };
        }

        public async Task<DbResult> ExecuteDbResultwithReturnIdAsync(string query, Parameters p = null)
        {
            p.Params.Add("@IsDbSuccess", dbType: DbType.Boolean, direction: ParameterDirection.Output);
            p.Params.Add("@DbMessage", dbType: DbType.String, size: 256, direction: ParameterDirection.Output);
            p.Params.Add("@ReturnId", dbType: DbType.Int32, direction: ParameterDirection.Output);

            using (var con = OpenConnection())
            {
                await con.ExecuteAsync(query, p == null ? null : p.Params, commandType: CommandType.StoredProcedure);
                return new DbResult
                {
                    IsDbSuccess = p.Get<bool>("@IsDbSuccess"),
                    DbMessage = p.Get<string>("@DbMessage"),
                    ReturnId = p.Get<int>("@ReturnId")
                };
            }
        }

        public async Task<DbResult> BulkCopyAsync<T>(List<T> data, string[] columns, string tableName, int bulkCopyTimeout, int batchSize)
        {
            using (var con = new SqlConnection(_connString))
            {
                await con.OpenAsync();

                using (var bulkCopy = new SqlBulkCopy(con))
                {
                    using (var reader = ObjectReader.Create(data, columns))
                    {
                        bulkCopy.DestinationTableName = tableName;
                        bulkCopy.BulkCopyTimeout = bulkCopyTimeout;
                        bulkCopy.BatchSize = batchSize;

                        await bulkCopy.WriteToServerAsync(reader);
                    }
                }
                con.Close();
                return new DbResult
                {
                    IsDbSuccess = true,
                    DbMessage = "Bulk copy successful",
                    ReturnId = 0
                };
            }

        }

        #endregion
    }
}
