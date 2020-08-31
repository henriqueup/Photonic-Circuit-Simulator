# Use an official Python runtime as an image
FROM python:3.6

COPY . /app
# Sets the working directory for following COPY and CMD instructions
# Notice we haven’t created a directory by this name - this
# instruction creates a directory with this name if it doesn’t exist
WORKDIR /app

# Install any needed packages specified in requirements.txt
RUN pip install -r requirements.txt

ENTRYPOINT ["python"]
CMD ["run.py"]